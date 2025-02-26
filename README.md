# swarm

Swarm is a fully open source framework for creating RL training swarms over the internet. Running a swarm-node allows you to launch a new swarm or connect to an existing node using its public address and join an existing swarm. 

Each swarm performs RL reasoning as a group, with a gossiping system (using Hivemind) for collaborative improvement between models. Running the bundled client allows you to connect to a swarm, listen to messages, and display the progress on a local (or hosted) webapp.

Swarm is fully open and permissionless, meaning you can run it on a basic consumer laptop at home or on a powerful GPU in the cloud. And finally, it demonstrates our Reproducible Operators (RepOps) libraries.

As part of running a Swarm node you can also trial the Gensyn repop framework - showing fully reproducible model execution across supported devices (inference only).

# Run the swarm

Ensure you have Docker installed and that you are using a supported machine/device:

- x86 or arm64 CPU with minimum 16gb ram
- CUDA devices:
    - RTX 30xx 
    - RTX 4090 
    - A100
    - H100
    - A16
    - A2
    - A10
    - A40 


### Download and run swarm image 

```
docker run -it --env PEER_MULTI_ADDRS='/ip4/38.101.215.13/tcp/30002/p2p/QmQ2gEXoPJg6iMBSUFWGzAabS2VhnzuS782Y637hGjfsRJ' --pull=always europe-docker.pkg.dev/gensyn-main/registry/rl-swarm:main bash
```

### Run the swarm alone
```./run_hivemind.sh ```

### Run repops alone
```./run_repops_demo.sh```

### Run both
```./run_all.sh```


### Download and run optional UI image

```
docker run -p 8080:8000 --env INITIAL_PEERS="/ip4/38.101.215.13/tcp/30002/p2p/QmQ2gEXoPJg6iMBSUFWGzAabS2VhnzuS782Y637hGjfsRJ" europe-docker.pkg.dev/gensyn-main/registry/rl-swarm-www:main
```



