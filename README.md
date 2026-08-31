# myapplication

A small, real Node.js/Express frontend, built as sample input for the
Infrastructure Provisioning Portal's "Build and Deploy" feature — pick this
repo's URL, and the portal builds this image and deploys it onto an OKE
cluster through ArgoCD.

## Run it locally

```
npm install
npm start
```

Then open http://localhost:8080 — `/healthz` returns a small JSON status
Kubernetes' own liveness/readiness probes call.

## Build the container image

```
docker build -t myapplication:latest .
docker run -p 8080:8080 myapplication:latest
```

## Deploy it

`k8s/` has everything needed:

- `deployment.yaml` — two replicas, readiness/liveness probes on `/healthz`,
  real (small) CPU/memory requests and limits.
- `service.yaml` — a plain ClusterIP service in front of the pods.
- `ingress.yaml` — routes `myapplication.dev-oke2.noqodi.internal` to the
  service through the cluster's ingress-nginx controller. No real DNS is
  needed to try this: point that hostname at the ingress controller's load
  balancer IP yourself (a hosts-file entry works for testing).

```
kubectl apply -f k8s/
```

Swap `deployment.yaml`'s `image:` for the real image once it's built and
pushed — this repo ships with a placeholder tag so the manifests are valid
on their own before any pipeline has run.
