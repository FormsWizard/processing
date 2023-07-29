## Theory

### Simple SecurityModel

$$SecurityLevel_{Estimation} = f(Environment, Configuration)$$

$$f: Environment \times Configuration \to SecurityLevel$$

### Declarative Representation

$$ThreatModel \subseteq SecurityLevel \times Environment \times Configuration$$

$$\implies$$

$$f_1: SecurityLevel_{Estimation} = f_1(Environment, Configuration)$$

$$\equiv$$

$$(Environment, Configuration) \mapsto \{SecurityLevel \mid (SecurityLevel, Environment, Configuration)\in ThreatModel\}$$

#### For free:


$$f_2: check_{IsModelledSecurityEnough} = f_2(SecurityLevel_{minimalRequiredByPolicy}, Environment, Configuration)\\
= SecurityLevel_{minimalRequiredByPolicy} \ge SecurityLevel_{Estimation}(Environment, Configuration)$$

$$\equiv$$

$$(SecurityLevel_{minimalRequiredByPolicy}, Environment, Configuration) \mapsto \\ \exists SecurityLevel: (SecurityLevel, Environment, Configuration) \in ThreatModel \land \\ SecurityLevel \ge SecurityLevel_{minimalRequiredByPolicy}$$
<br/>

$$f_3: Configuration_{suggestedImprovement} = f_3(Environment, Configuration_{original})$$

$$\equiv$$

$$(Environment, Configuratio_{Original}) \mapsto\\ \{Configuration_{suggestedImprovement} \mid SecurityLevel_{suggestedImprovement} \gt SecurityLevel_{Original} \land \\(SecurityLevel_{suggestedImprovement}, Environment, Configuration_{suggestedImprovement})\in ThreatModel \land \\(SecurityLevel_{original}, Environment, Configuration_{original})\in ThreatModel\}$$


### Multiple Threats

$$ThreatModel_{Total} = \prod_{i=1}^n ThreatModel_{Threat_{i}} = ThreatModel_{Threat_{1}} \times ThreatModel_{Threat_{2}} \times \dotsb \times ThreatModel_{Threat_{n}}$$

$$SecurityLevel_{Total} = f_{weight}(SecurityLevel_{Threat_{1}}, SecurityLevel_{Threat_{2}}, \dotsb, SecurityLevel_{Threat_{n}})$$

#### trivial Model:

$$SecurityLevel_{Total} = min(SecurityLevel_{Threat_{1}}, SecurityLevel_{Threat_{2}}, \dotsb, SecurityLevel_{Threat_{n}})$$

### Challenge

Effective declarative represention of sparse relation

$$ThreatModel \subseteq SecurityLevel \times Environment \times Configuration$$

## Example Model

### SecurityLevel

```typescript
export enum SECURITY_LEVEL {
  advanced='advanced',
  good='good',
  dubious='dubious',
  insufficient='insufficient'
};
```

```typescript
const policy = { minimum: SECURITY_LEVEL.good };
```

### Environment

```typescript
export enum SERVER { 
  disabled = 'disabled',
  untrusted = 'untrusted',
  limited = 'limited',
  local = 'local',
  trusted = 'trusted',
}

export enum CLIENT {
  untrusted = 'untrusted',
  limited = 'limited',
  trusted = 'trusted'
}

export type ENV = SERVER|CLIENT;
```

```typescript
export const environment = {
  appServer: SERVER.local,
  storageServer: SERVER.disabled,
  syncServer: { webrtc: SERVER.untrusted,
                websocket: SERVER.trusted },
  client: CLIENT.limited
}


```

### Configuration

```typescript
export enum SYNC_enabled {
  disabled = 'disabled',
  enabled = 'enabled'
}

export enum SYNC_protocol {
  webrtc = 'webrtc',
  websocket = 'websocket'
};

export enum SYNC_e2e_encryption {
  gpg = 'gpg',
  builtin = 'builtin',
  off = 'off'
}

export enum SYNC_connection_encryption {
  tls = 'tls',
  off = 'off'
}

export interface SYNC {
  enabled: SYNC_enabled,
  protocol: SYNC_protocol,
  e2e_encryption: SYNC_e2e_encryption,
  connection_encryption: SYNC_connection_encryption
};
```

```typescript
export const syncConfig: SYNC = {
  enabled: SYNC_enabled.enabled,
  protocol: SYNC_protocol.webrtc,
  e2e_encryption: SYNC_e2e_encryption.builtin,
  connection_encryption: SYNC_connection_encryption.off
};
```

### ThreatModel

```typescript
export const exampleThreatModel: THREAT_MODEL = {
  [SECURITY_LEVEL.advanced]: {
    '*': [{ enabled: SYNC_enabled.disabled }],
    [SERVER.trusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.good]: {
    [SERVER.trusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ],
    [SERVER.local]: [
      { e2e_encryption: SYNC_e2e_encryption.gpg },
      { e2e_encryption: SYNC_e2e_encryption.builtin }
    ],
    [SERVER.limited]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.dubious]: {
    [SERVER.trusted]: [
      { e2e_encryption: SYNC_e2e_encryption.gpg },
      { e2e_encryption: SYNC_e2e_encryption.builtin },
      { connection_encryption: SYNC_connection_encryption.tls }
    ],
    [SERVER.local]: [{}],
    [SERVER.limited]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ],
    [SERVER.untrusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.insufficient]: {
    [SERVER.untrusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  }
}

```
