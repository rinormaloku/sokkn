#mv ~/Downloads/kn*.yaml ~/.kube/config
kubectl apply -f section-1/install/istio/istio-crds.yaml
kubectl apply -f section-1/install/istio/istio-lean.yaml

kubectl apply -f section-1/install/knative/.
sleep 10s
kubectl apply -f section-1/install/knative/.

#kubectl label namespace default knative-eventing-injection=enabled

