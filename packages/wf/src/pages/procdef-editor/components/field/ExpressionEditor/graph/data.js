export default {
    "name": "flare",
    "children": [
     {
      "name": "analytics",
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "value": 3938},
         {"name": "CommunityStructure", "value": 3812},
         {"name": "HierarchicalCluster", "value": 6714},
         {"name": "MergeEdge", "value": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "value": 3534},
         {"name": "LinkDistance", "value": 5731},
         {"name": "MaxFlowMinCut", "value": 7840},
         {"name": "ShortestPaths", "value": 5914},
         {"name": "SpanningTree", "value": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "value": 7074}
        ]
       }
      ]
     }
    ]
   }
   