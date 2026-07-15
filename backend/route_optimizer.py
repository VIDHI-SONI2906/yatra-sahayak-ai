import networkx as nx

G = nx.Graph()

G.add_weighted_edges_from([
    ("Ujjain Railway Station", "Simhastha Sector A", 3),
    ("Ujjain Railway Station", "Simhastha Sector B", 4),

    ("Simhastha Sector A", "Ram Ghat", 2),
    ("Simhastha Sector B", "Mahakaleshwar Temple", 2),

    ("Ram Ghat", "Har Siddhi Temple", 1),

    ("Nanakheda Bus Stand", "Simhastha Sector C", 2),

    ("Simhastha Sector C", "Ram Ghat", 3),

    ("Mahakaleshwar Temple", "Har Siddhi Temple", 1),

    ("Simhastha Sector B", "Simhastha Sector C", 2)
])

def get_best_route(source, destination):
    path = nx.shortest_path(
        G,
        source=source,
        target=destination,
        weight="weight"
    )

    total_weight = nx.path_weight(G, path, weight="weight")

    return {
        "path": path,
        "estimated_time": total_weight
    }