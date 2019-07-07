# Installing Knative

## Pre-requisite

To follow with this course you need a cluster with:
   - 10GB of memory and 
   - 6 virtual processors. 

Verify that your cluster meets the minimum requirements by executing the command below:

```
kubectl get node -o custom-columns=NAME:.metadata.name,CPU:.status.capacity.cpu,Memory:.status.capacity.memory
```

## Installing Istio components

To install Istio components execute the commands below starting with the CRDs:

```
kubeclt apply -f install/istio/istio-crds.yaml
kubeclt apply -f install/istion/istio-lean.yaml
```

### Verify Istio installation

```
kubectl get pods -n istio-system
```

Initialize INGRESS_IP by executing the command below:

```
INGRESS_IP=$(kubectl get svc -n istio-system \
  -l app=istio-ingressgateway \
  -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}')
```

## Installing Knative components

Just as in the case of Istio initially install the CRD's:

kubectl apply --selector knative.dev/crd-install=true \
   --filename install/knative/serving.yaml \
   --filename install/knative/build.yaml \
   --filename install/knative/release.yaml \
   --filename install/knative/eventing-sources.yaml \
   --filename install/knative/clusterrole.yaml

And continue installing Knative components:

k apply --filename install/knative/serving.yaml --selector networking.knative.dev/certificate-provider!=cert-manager \
   --filename install/knative/build.yaml \
   --filename install/knative/release.yaml \
   --filename install/knative/eventing-sources.yaml \
   --filename install/knative/clusterrole.yaml

## Verify installation

Install `httpbin` by executing the command below: 

```
kubectl apply -f httpbin.yaml
```

Initialize host variable needed in subsequent commands: 
```
HOST=$(kubectl get routes httpbin-service -o jsonpath='{.status.address.hostname}')
```

### Test serving

Install `hey` a load testing tool by executing:

```
go get -u github.com/rakyll/hey
```

Open two terminals and:

Terminal 1:
- execute `kubectl get pods --watch`

Terminal 2:
- execute: 
```
hey -z 9s -c 3 --host $HOST http://$INGRESS_IP/delay/10 
```