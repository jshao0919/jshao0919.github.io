# Source notes and mathematical qualifications

Numbering follows the supplied fourth-edition textbook, `Lay01.pdf`. The
solutions work from the printed problem data and explain inconsistencies
where they affect the requested conclusion. The relevant PDF solution gives
the calculation or counterexample in full.

| Exercise | Observation and treatment |
| --- | --- |
| 1.3.11 | The printed vectors satisfy `b = 2a₁ + 3a₂`, although the selected answer says otherwise. The solution checks all three coordinates. |
| 2.2.28 | An elementary matrix is formed by applying the row operation to the identity matrix. The printed reference to a row of `A` in that construction is corrected explicitly. |
| 3.3.30 | Unsigned triangle area requires the absolute value of the determinant. The determinant without absolute values records orientation. |
| 3.3.35 | The historical MATLAB `flops` counter is conditional in the question. The solution states and evaluates a reproducible arithmetic-count model instead of inventing measurements from an unavailable counter. |
| 4.7.2 | The printed relations give `b₂ = −(3/2)b₁`, contradicting the assertion that these two vectors form a basis. The formal conversion to the stated `C` basis is still calculated, and its singularity is explained. |
| 5.5.24 | A complex eigenvector can have zero real part. The proof establishes that the eigenvalue is real and that each nonzero real or imaginary part is a real eigenvector; at least one is nonzero. |
| 5.7.15–16 | The supplied matrices have real spectra despite the complex-eigenfunction instructions. The solutions compute the spectra and give the corresponding real solutions. |
| 6.8.10 | The square wave has jump discontinuities. Its Fourier and least-squares integrals use the piecewise-continuous function. Changing isolated endpoint values does not change the integrals. |
| 7.S.15–16 | The supplied right-hand side makes both displayed systems inconsistent. No exact solution exists; the pseudoinverse gives the minimum-norm least-squares solution, whose residual and norm are checked. |
| 8.3.16 | The reference used in the elimination argument points to the wrong preceding exercise. The solution identifies the intended dependence argument and supplies it. |
| 8.6.2 | The B-spline coefficient of `p₁` is missing a square on `(1−t)` compared with the section's defining formula. The solution explains the literal formula's failure and states the corrected convention used for the B-spline exercises. |

For weighted least squares in Section 6.8, the book's diagonal matrix `W`
multiplies residuals: the objective is `‖W(y−Xβ)‖²`. Thus the normal equations
use `W²` for real diagonal `W`; halving a residual multiplier quarters its
contribution to the squared objective.

For Exercise 5.8.4, the power method targets the eigenvalue of largest
absolute value, `−0.4`; the algebraically largest eigenvalue is `0.1`.
For the matrix discussed in 3.2.46 and 7.4.28, the computed 2-norm condition
number is about `11.3525`. The solutions distinguish relative conditioning
from the size of a determinant, which also changes when a matrix is scaled.

In true/false exercises, universal quantifiers and matrix shapes are part
of the claim. The solutions spell out those conditions and give
counterexamples when the stated conditions are insufficient.

The source PDF contains Chapters 1–8 and the appendices. Its table of
contents also lists separately published online Chapters 9–10; their text
and exact exercises have not been supplied.
