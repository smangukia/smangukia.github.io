// troika-three-text.d.ts
declare module 'troika-three-text' {
  import * as THREE from 'three';
  
  export class Text extends THREE.Object3D {
    text: string;
    fontSize: number;
    color: string | THREE.Color;
    anchorX: string | number;
    anchorY: string | number;
    font: string;
    textAlign: string;
    lineHeight: number;
    letterSpacing: number;
    maxWidth: number;
    direction: string;
    textIndent: number;
    whiteSpace: string;
    overflowWrap: string;
    material: THREE.Material | THREE.Material[];
    
    sync(): void;
    dispose(): void;
  }
}