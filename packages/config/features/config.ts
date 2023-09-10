const developerMode = Boolean(typeof(process) != 'undefined' && process.env.developerMode && process.env.developerMode != 'false');

export const config = {
  developerMode  /** this option is independent of being a development-build, but specifies if debug features for developers should be enabled **/
};
