/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Asset mapping configuration file for hotlinked assets from the design specification.
 * Streamlines design-to-development workflow and ensures high-fidelity UI parity.
 */

export interface AssetMetadata {
  id: string;
  name: string;
  url: string;
  alt: string;
  aspectRatio: string;
  category: 'project' | 'avatar' | 'architecture' | 'badge';
  specLabel?: string;
  specValue?: string;
}

export const ASSET_MAP: Record<string, AssetMetadata> = {
  nexora: {
    id: 'nexora',
    name: 'Nexora Privacy Platform',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnKuUwTmug5XTiZXK8Qfc2BeV_1XJpCsADK_OzdYPV6OgYUl2a6-0emsLq_pl7G4IC8Dyy8GJGZeLhS0ZW5SJF7afAZHuh3b6Agi_T1ECJO4NCrL4VLfpXRGUK-xy_AFpA3O9lNhNaQ10VhkbV_B2k8cye1Yw1v5Mr2bYkG0VTZFdB44AHTJp0WYYERIYj2NRfEYdGpWDkzefNFJqu0WnnGAW9IwpPnpHFw1kneJXjRC2R8-AGN0Jw_g',
    alt: 'A dark cinematic interface mockup showing Nexora privacy platform on mobile and desktop screens with glowing cyan cryptographic status badges and real-time audio waveforms in an ultra-sleek minimalist aesthetic.',
    aspectRatio: '16/10',
    category: 'project',
    specLabel: 'WebRTC / Signal Protocol',
    specValue: 'ZERO-KNOWLEDGE AUTH'
  },
  wearixa: {
    id: 'wearixa',
    name: 'Wearixa Headless E-Commerce',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGzbkTx2SNRzvPEmeIzk4PRof73o51Kv_myxo1GZJYrdzIIfi1-BStpRckfKxvDMfVELmhEtzzD_jO-aruHlDxGvjKbq5thbSt5PVj2y5XuaUsjFpYERqHccu-UlDiaHHtXMLzq67waGsKY1usXYAoElolxheF8bc-r6P4DVDWkbznwtXspFJJr4c9CCnTmtV5Jtt0EmWpTKb3hkV1Zs00ex_dlmNEZDPfBOWuO_RwnNCmIH2aV5pAEg',
    alt: 'A clean, dark mode headless e-commerce analytics dashboard and checkout screen for Wearixa, displaying real-time inventory synchronization, sub-second latency monitors, and encrypted payment flows.',
    aspectRatio: '16/10',
    category: 'project',
    specLabel: 'Redis Sub-50ms Search',
    specValue: 'PCI-DSS LEVEL 1 READY'
  },
  devsecopsLab: {
    id: 'devsecopsLab',
    name: 'Cloud DevSecOps Sandbox & Testing Labs',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBljRGOOz64Eo4Mju_inD9gbwFo2dAc8QMopfmHhM6HZly2-QrjokHKiMP496R3J_U3OMLe5JmD8lMsYwYW7-PbmEzUK5lH6gnlAw-ynm3Cz_kKMQEdXujYxvJJhx0flJEkZP-Kr5xEejMfOZmobG2QVX1sXZ1h6BNfFttP-PAd-ypDaEztIEc5DJuiIlQaXqRAsIAnnDU2WPxrAu9AtHu7H6n9GwqVzGZD5TJKb6v9rd6Q_ul2vtt21A',
    alt: 'Dark aesthetic engineering terminal showing automated AWS Terraform provisioning, Trivy CVE vulnerability scans, and GitHub Actions continuous integration pipelines running simultaneously with green status checks.',
    aspectRatio: '16/10',
    category: 'project',
    specLabel: 'Terraform / OCI Spec',
    specValue: '100% REPRODUCIBLE IAC'
  }
};

/**
 * Helper to safely retrieve hotlinked asset URL with fallback
 */
export function getAssetUrl(key: keyof typeof ASSET_MAP): string {
  return ASSET_MAP[key]?.url || '';
}

/**
 * Helper to retrieve asset metadata
 */
export function getAssetMeta(key: keyof typeof ASSET_MAP): AssetMetadata | undefined {
  return ASSET_MAP[key];
}
