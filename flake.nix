{
  description = "";
  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      lastModifiedDate = self.lastModifiedDate or self.lastModified or "19700101";
      version = builtins.substring 0 8 lastModifiedDate;
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; overlays = [ self.overlay ]; });
      pname = "fw-processing";
    in {
      overlay = final: prev: with final; let
        version = (lib.importJSON ./package.json).version;
        meta_ = {
          license = lib.licenses.mit;
          homepage = "";
          maintainers = with lib.maintainers; [ j03 ];
          platforms = lib.platforms.linux;
        };
        scope = "react-redux-yjs";
      in rec {

        "${pname}-${scope}-turbo" = stdenv.mkDerivation rec {
          inherit version;
          name = "${pname}-${scope}-turbo-${version}";
          src = ./.;
          buildInputs = [turbo];
          buildPhase = ''
            turbo prune --scope "${scope}"
          '';
          installPhase = ''
            cp -r out $out
          '';
          meta = meta_ // {description = "Pruned turbo-repo (containing pnpm package)";};
        };

        "${pname}-${scope}-yarn" = stdenv.mkDerivation rec {
          inherit version;
          name = "${pname}-${scope}-yarn-${version}";
          src = fw-processing-react-redux-yjs-turbo;
          buildInputs = [pnpm-lock-export gnused];
          buildPhase = ''
            pnpm-lock-export --schema yarn.lock@v1
            #sed -i 's/"workspace:\*"/"*"/g' package.json
            #sed -i 's/"workspace:\*"/"*"/g' packages/${scope}/package.json
          '';
          installPhase = ''
            cp -r . $out
          '';
          meta = meta_ // {description = "Yarn-repo (with workspaces)";};
        };

        fw-processing-react-redux-yjs-nodeModules = stdenv.mkDerivation rec {
          inherit version;
          name = "${pname}-${scope}-nodeModules-${version}";
          src = #fw-processing-react-redux-yjs-turbo;
                fw-processing-react-redux-yjs-yarn;
          buildInputs = [nodePackages.pnpm yarn nodejs];
          buildPhase = ''
            export HOME=$(mktemp -d)

            pnpm install

            #yarn --ignore-scripts
            #( cd packages/${scope}
            #  yarn
            #)
          '';
          installPhase = ''
            cp -r . $out
          '';
          meta = meta_ // {description = "";};
          outputHashMode = "recursive";
          #outputHash = lib.fakeHash;
          outputHash = "sha256-y4B0+4W6Ng8Nb/SqdiihByojBvLDqfgs/Cvi7oU5ERM=";
          #outputHash = (lib.importJSON ./flake.hashes.json).react-redux-yjs;
          allowedReferences = [bash nodejs];
          __structuredAttrs = true;
          unsafeDiscardReferences.out = true;
          #__contentAddressed = true;
        };

        "${pname}-${scope}-nodePackage" = stdenv.mkDerivation rec {
          inherit version;
          name = "${pname}-${scope}-nodePackage-${version}";
          src = fw-processing-react-redux-yjs-yarn;
          buildInputs = [yarn] ++ [fw-processing-react-redux-yjs-nodeModules] ++ [nodejs];
          buildPhase = ''
            ln -s ${fw-processing-react-redux-yjs-nodeModules}/node_modules .
            cp ${fw-processing-react-redux-yjs-nodeModules}/yarn.lock . || true

            ln -s ${fw-processing-react-redux-yjs-nodeModules}/packages/${scope}/node_modules packages/${scope}
            cp ${fw-processing-react-redux-yjs-nodeModules}/packages/${scope}/yarn.lock packages/${scope}  || true
          '';
          installPhase = ''
            cp -r . $out
          '';
          meta = meta_ // {description = "";};
        };

        "${pname}" = fw-processing-react-redux-yjs-nodePackage;

        "${pname}-dev" = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [ yarn nodejs ];
          shellHook = ''
            export HOME=$(mktemp -d)
            ls -l ${fw-processing-react-redux-yjs-nodeModules} ~/nodePackage
            #cp -rL ${fw-processing-react-redux-yjs-nodePackage} ~/nodePackage
            chmod -R +w ~/
            cd ~/nodePackage

            ( cd packages/react-redux-yjs/node_modules
              #rm -r eslint-config-custom style tsconfig
              #ln -s ../../eslint-config-custom .
              #ln -s ../../react-redux-yjs .
              #ln -s ../../style .
              #ln -s ../../tsconfig .
            )

            #rm -r node_modules/turbo
            yes | pnpm install  ## TODO
            pnpm --offline --frozen-lockfile install
            pnpm --offline build

            #yarn --offline install
            #rm -r node_modules/turbo
            #pnpm install
            ##yarn --offline build
          '';
        };
      };
      packages = forAllSystems (system: {
        inherit (nixpkgsFor.${system}) fw-processing-react-redux-yjs-turbo fw-processing-react-redux-yjs-yarn fw-processing-react-redux-yjs-nodeModules fw-processing-react-redux-yjs-nodePackage fw-processing fw-processing-dev;
      });
      defaultPackage = forAllSystems (system: self.packages.${system}."${pname}");
      devShell = forAllSystems (system: self.packages.${system}."${pname}-dev");
    };
}
