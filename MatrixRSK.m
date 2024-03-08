BiwordRSK[w_, P_:{}, Q_:{}] := If[w == {}, {P, Q}, 
     Module[{B = BiwordInsertion[P, Q, First[w]]}, BiwordRSK[Rest[w], 
       First[B], Last[B]]]]
 
BiwordInsertion[P_, Q_, {q_, p_}] := Module[{R = RowInsertion[P, p]}, 
     {First[R], If[Length[Q] < Last[R], Join[Q, {{q}}], 
       Insert[Q, q, {Last[R], Length[Q[[Last[R]]]] + 1}]]}]
 
RowInsertion[T_, j_, r_:1] := Which[T == {}, {{{j}}, r}, Max[First[T]] <= j, 
     {Join[{Join[First[T], {j}]}, Rest[T]], r}, True, 
     Module[{i = FirstPosition[First[T], _?(#1 > j & )][[1]], R}, 
      R = RowInsertion[Rest[T], First[T][[i]], r + 1]; 
       {Join[{ReplacePart[First[T], i -> j]}, First[R]], Last[R]}]]
 
InverseBiwordRSK[P_, Q_, w_:{}] := If[P == {}, w, 
     Module[{IBI = InverseBiwordInsertion[P, Q]}, InverseBiwordRSK[IBI[[1]], 
       IBI[[2]], Prepend[w, IBI[[3]]]]]]
 
InverseBiwordInsertion[P_, Q_] := 
    Module[{location = Reverse[Sort[Reverse /@ Position[Q, Max[Q]]][[-1]]], 
      IRI, q = Max[Q]}, IRI = InverseRowInsertion[P, location[[1]]]; 
      {IRI[[1]], Select[Delete[Q, location], #1 != {} & ], {q, IRI[[2]]}}]
 
InverseRowInsertion[T_, r_] := Module[{row = r, newT = T, i, j = T[[r,-1]], 
      newj}, newT = Select[Delete[newT, {row, -1}], #1 != {} & ]; 
      While[row > 1, row = row - 1; 
        i = Flatten[Position[newT[[row]], _?(#1 < j & )]][[-1]]; 
        newj = newT[[row,i]]; newT = ReplacePart[newT, {row, i} -> j]; 
        j = newj]; {newT, j}]
 
MatrixToBiword[A_] := Flatten[Table[Table[{i, j}, A[[i,j]]], {i, Length[A]}, 
      {j, Length[Transpose[A]]}], 2]
 
BiwordToMatrix[w_] := Table[Count[w, _?(#1 == {i, j} & )], 
     {i, Max[First /@ w]}, {j, Max[Last /@ w]}]
 
MatrixRSK[A_] := BiwordRSK[MatrixToBiword[A]]
 
InverseMatrixRSK[{P_, Q_}] := BiwordToMatrix[InverseBiwordRSK[P, Q]]
