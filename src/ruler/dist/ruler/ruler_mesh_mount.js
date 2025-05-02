export function ruler_mesh_mount() {
    this.observer.root.append(this.mesh.node());
    this.mesh.lower();
}
