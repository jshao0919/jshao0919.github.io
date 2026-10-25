#!/usr/bin/env python3
"""Independent finite enumeration for Section 17 (Python standard library only)."""
from collections import Counter
from itertools import combinations, permutations, product


def rotations():
    """All 24 orientation-preserving signed coordinate permutations."""
    answer = []
    for axes in permutations(range(3)):
        inversions = sum(axes[i] > axes[j] for i in range(3) for j in range(i + 1, 3))
        parity = (-1) ** inversions
        for signs in product((-1, 1), repeat=3):
            if parity * signs[0] * signs[1] * signs[2] == 1:
                answer.append((axes, signs))
    return answer


def apply(rotation, point):
    axes, signs = rotation
    return tuple(signs[i] * point[axes[i]] for i in range(3))


def induced(rotation, points):
    return tuple(points.index(apply(rotation, point)) for point in points)


def cycles(permutation):
    seen = set()
    count = 0
    for start in range(len(permutation)):
        if start in seen:
            continue
        count += 1
        point = start
        while point not in seen:
            seen.add(point)
            point = permutation[point]
    return count


def burnside(name, actions, colors, expected_histogram, expected_orbits):
    histogram = Counter(map(cycles, actions))
    assert histogram == expected_histogram, (name, histogram)
    numerator = sum(number * colors ** count for count, number in histogram.items())
    assert numerator % len(actions) == 0
    answer = numerator // len(actions)
    assert answer == expected_orbits, (name, answer)
    print(f"{name}: {len(actions)} rotations, cycle counts {dict(sorted(histogram.items()))}, "
          f"{answer:,} coloring orbits")


def main():
    cube = rotations()
    assert len(cube) == 24
    faces = [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)]
    vertices = list(product((-1, 1), repeat=3))
    prism = [rotation for rotation in cube
             if apply(rotation, (0, 0, 1)) in ((0, 0, 1), (0, 0, -1))]
    assert len(prism) == 8
    tetra_vertices = [(1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)]
    tetra = [rotation for rotation in cube
             if {apply(rotation, point) for point in tetra_vertices} == set(tetra_vertices)]
    assert len(tetra) == 12
    edges = [frozenset(pair) for pair in combinations(tetra_vertices, 2)]
    tetra_edges = [tuple(edges.index(frozenset(apply(rotation, point) for point in edge))
                         for edge in edges) for rotation in tetra]
    prism_faces = [induced(rotation, faces) for rotation in prism]
    burnside("17.5 cube faces", [induced(rotation, faces) for rotation in cube],
             8, {6: 1, 4: 3, 3: 12, 2: 8}, 11712)
    burnside("17.6 cube vertices", [induced(rotation, vertices) for rotation in cube],
             4, {8: 1, 4: 17, 2: 6}, 2916)
    burnside("17.8 tetrahedron edges", tetra_edges,
             2, {6: 1, 4: 3, 2: 8}, 12)
    burnside("17.9(b) prism faces", prism_faces,
             6, {6: 1, 4: 3, 3: 4}, 6426)

    # Check 17.9(b) a second way, without Burnside's formula or cycle counts.
    seen = set()
    orbit_count = 0
    for coloring in product(range(6), repeat=6):
        if coloring in seen:
            continue
        orbit_count += 1
        for action in prism_faces:
            seen.add(tuple(coloring[index] for index in action))
    assert len(seen) == 46656
    assert orbit_count == 6426
    print("Direct prism enumeration: all 46,656 labeled colorings, 6,426 orbits")


if __name__ == "__main__":
    main()
