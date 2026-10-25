# Source conventions and qualifications

These notes follow the supplied seventh-edition scan. The corresponding
solutions explain each issue where it matters; the labels below identify
exercises or section-wide conventions. This is separate from errors found
and corrected in draft solutions during review.

## Reading the scan

The PDF has no text layer. OCR is used to locate material, and rendered
exercise pages are the authority for mathematical signs, superscripts,
matrices, tables, and diagrams. Blank leaves are omitted, so a constant
printed-page offset is unreliable. Exercise sets can continue above the
next section's heading. `inventory.json` records their actual PDF pages.
The old website's selected ranges and section titles were not used as
source data.

## Geometry and actions

- **Section 12:** a *nontrivial glide reflection* has Fraleigh's specific
  meaning: it cannot be expressed as a translation already in the symmetry
  group followed by a reflection already in that group. A pattern can have
  glide isometries without satisfying that stronger condition. For the
  Escher exercises, markings and shading are ignored as the questions direct.
- **12.39(c):** the printed odd-answer key says there are no nontrivial glides.
  The figure has horizontal and vertical mirrors and quarter-turns, but no
  diagonal mirrors. Composing a quarter-turn with an existing mirror gives a
  diagonal glide. It cannot factor through a translation and an available
  reflection, since such a factorization would require a diagonal reflection.
  The solution explains the visual classification and this algebraic check.
- **15.39(c):** special cycles `(r,s,i)` require three distinct entries;
  there are `n−2` such cycles after fixing `r,s`.
- **Section 16:** transitive-action classifications use nonempty sets.
  The quantified definition alone is vacuously true for the empty set;
  this edge case is stated explicitly. In **16.9(c)**, subactions can be
  unions of orbits, not only individual orbits.
- **Section 17:** solid tetrahedra, cubes, and prisms are identified by rigid
  rotations. Turning over a square piece of cardboard also permits its
  planar reflections. In **17.6**, colors are available rather than all
  required; the alternate interpretation requiring all four is also calculated.
- **17.9(b):** the odd-answer key prints **6,246**. The eight prism rotations
  have face-cycle-count multiplicities `{6:1, 4:3, 3:4}`, so Burnside gives
  `(6^6 + 3·6^4 + 4·6^3)/8 = 6,426`. Direct enumeration of all 46,656 labeled
  colorings also gives **6,426** orbits. Run `python3 verify_counting.py`
  for a portable independent check.

## Rings, polynomials, and order

- **Section 18:** ring homomorphisms need not preserve unity, and subrings
  need not contain the ambient unity. **18.22** has the exceptional case
  `n=1`. In **18.45**, `P=A(AᵀA)⁻¹Aᵀ` is an `m×m` matrix when `A` is
  `m×n`; the printed `n×n` description has the dimensions reversed.
- **Section 19:** integral domains and subdomains have nonzero unity in the
  textbook's convention.
- **20.9:** equal and distinct primes require separate cases. In **20.23(d)**,
  `φ(1)=1` is an exception; **20.23(e)** uses the usual modular-ring case `n≥2`.
- **21.13:** the localization construction needs a nonzero regular element.
  Fraleigh excludes zero from the term *zero divisor*, so that hypothesis
  must be expressed explicitly.
- **Section 22:** a formal polynomial is distinguished from its polynomial
  function, particularly over finite fields.
- **23.25:** parts (e) and (f) repeat the same assertion in the scan; both are
  answered. Part (j) needs the zero-polynomial exception.
- **24.11(c):** the identity endomorphism is the zero endomorphism when the
  underlying group is trivial; the solution distinguishes that case.
- **25.26:** the positive cone induced on a subring is nonempty only when
  that subring is nonzero. A nonzero-unity subring is also needed if the
  section's standing unity convention is imposed.
- **28.29:** the generated-ideal description prints coefficients `cᵢ∈I`,
  making the definition circular. The intended coefficient set is the
  ambient ring `R`; that correction is explicit in the solution.

## Advanced groups and homology

- **Section 35:** the solutions follow Fraleigh's definitions of principal
  series and solvability. They differ from broader modern chief-series and
  solvability terminology; in particular the text's finite composition-series
  formulation restricts the solvability discussion.
- **36.19:** the statement includes the prime-order case `m=1, r=1`, where
  `Zₚ` is simple. The solution gives that counterexample and proves the
  corrected composite-order assertion.
- **40.13(a):** when `n=1`, the normal-form multiplication is cyclic of order
  `m` regardless of `r`, so the stated necessity has a degenerate exception.
  Part (b)'s presentation criterion is handled separately.
- **41.11:** identifying chains and cochains in the stated manner requires
  a finite complex. For an arbitrary complex, cochains are
  `Hom(Cₙ,Z)`; the solution gives the valid coboundary construction.
- **44.6 and 44.8:** relative homology agrees with reduced quotient homology
  in the quotient comparison. Ordinary quotient `H₀` can differ from relative
  `H₀`, so the degree-zero qualification is explicit.

## Factorization and Galois theory

- **45.30:** containment in a maximal ideal requires a proper ideal.
  **45.33:** the minimum condition concerns nonempty collections of ideals.
- **47.17:** the unit criterion uses absolute norm, and `n>1` is needed for
  the stated construction to give a genuine quadratic field.
- **50.16:** the left side of the printed formula needs `G(K/F)`.
  **50.22:** the automorphisms in question must fix `F`.
- **Section 51:** multiplicity assertions concern nonzero polynomials,
  factored in an algebraic closure.
- **Section 52:** Fraleigh uses a strict proper-extension convention for
  *totally inseparable*. In **52.5(h)**, equality with the separable closure
  must be permitted or the assertion is false under that convention.
- **Section 53:** Fraleigh's finite-normal terminology includes separability;
  this affects **53.15(i)** and is stated before the solutions.
- **54.12(c):** the discriminant/alternating-group equivalence requires
  distinct roots and characteristic different from 2. The solution supplies
  counterexamples and proves the assertion with its required hypotheses.
- **55.9(h):** ordinary regular `p`-gons use odd primes; the `p=2` case is
  degenerate and is distinguished.
