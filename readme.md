# Profile

This is just a simple container for displaying some information about me on the root of [my domain](https://www.cvsickle.com), but it also serves as an example of my pipeline powered by [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) and [Flux CD](https://github.com/fluxcd/flux2).

# Repository Mirrors

- GitHub - [https://github.com/cvsickle/profile](https://github.com/cvsickle/profile)
- Codeberg - [https://codeberg.org/cvsickle/profile](https://codeberg.org/cvsickle/profile)
- Forgejo (Mirror) - [https://git.cvsickle.com/cvsickle/profile](https://git.cvsickle.com/cvsickle/profile)

# Pipeline

When a release is created, the GitHub repository triggers the [forgejo_build.yaml](.woodpecker/forgejo_build.yaml) automation to run on the Woodpecker instance running on my [k3s Kubernetes Cluster](https://github.com/cvsickle/cluster-flux).

Woodpecker then builds the image, tags it with the GitHub release tag, and pushes the image to my [Forgejo instance](https://git.cvsickle.com).

On my cluster, Flux tracks this [package repo](https://git.cvsickle.com/cvsickle/-/packages/container/profile) for updates. When one is found, it updates the corresponding [deployment manifest](https://github.com/cvsickle/cluster-flux/blob/main/apps/cvsickle-profile/deployment.yaml).

In a production environment, this automation would ideally create a pull request. This being a homelab cluster, I've opted to allow this update to be automatically pushed.