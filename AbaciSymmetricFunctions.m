PowerToSchur[n_] := PowerToSchur[n] = Table[\[Chi][\[Lambda], \[Mu]], 
      {\[Lambda], IntegerPartitions[n]}, {\[Mu], IntegerPartitions[n]}]
 
\[Chi][\[Lambda]_, \[Mu]_] := RimHookTableaux[PartitionToAbaci[\[Lambda]], 
     \[Mu]]
 
RimHookTableaux[a_, \[Lambda]_] := Module[{\[Mu] = \[Lambda], 
      RHT = {{a, 1}}}, While[\[Mu] != {}, 
       RHT = Flatten[(RemoveKRimHook[First[#1], First[\[Mu]], 
             Last[#1]] & ) /@ RHT, 1]; \[Mu] = Rest[\[Mu]]]; 
      Total[Last /@ RHT]]
 
RemoveKRimHook[a_, k_, s_:1] := (RemoveRimHook[a, #1, s] & ) /@ 
     Select[PossibleRimHooks[a], Last[#1] == k & ]
 
RemoveRimHook[a_, {p_, k_}, s_:1] := 
    {DropRightOnes[DropLeftZeros[Table[If[i == p || i == p + k, 1 - a[[i]], 
         a[[i]]], {i, Length[a]}]]], s*(-1)^Count[a[[p + 1 ;; p + k - 1]], 1]}
 
DropRightOnes[a_] := a[[1 ;; -LengthWhile[Reverse[a], #1 == 1 & ] - 1]]
 
DropLeftZeros[a_] := a[[LengthWhile[a, #1 == 0 & ] + 1 ;; All]]
 
PossibleRimHooks[a_] := Select[Flatten[Table[{j, i - j}, 
       {i, Flatten[Position[a, 0]]}, {j, Flatten[Position[a, 1]]}], 1], 
     Last[#1] > 0 & ]
 
PartitionToAbaci[\[Lambda]_, a_:{}] := If[\[Lambda] == {}, a, 
     PartitionToAbaci[Most[\[Lambda]], Join[{1}, 
       Table[0, Last[\[Lambda]] - Count[a, 0]], a]]]
ElementaryToHomogeneous[n_] := ElementaryToHomogeneous[n] = 
     SchurToHomogeneous[n] . ElementaryToSchur[n]
 
SchurToHomogeneous[n_] := SchurToHomogeneous[n] = 
     Transpose[MonomialToSchur[n]]
 
MonomialToSchur[n_] := MonomialToSchur[n] = 
     Table[InverseKostkaRow[\[Lambda]], {\[Lambda], IntegerPartitions[n]}]
 
InverseKostkaRow[\[Lambda]_] := 
    Table[Total[First /@ Select[SpecialRimHookTableaux[PartitionToAbaci[
          \[Lambda]]], Last[#1] == \[Mu] & ]], 
     {\[Mu], IntegerPartitions[Total[\[Lambda]]]}]
 
SpecialRimHookTableaux[a_, s_:1, \[Lambda]_:{}] := 
    If[a == {}, {{s, ReverseSort[\[Lambda]]}}, 
     Flatten[SpecialRimHookTableaux @@@ RemoveSpecialRimHooks[a, s, 
        \[Lambda]], 1]]
 
RemoveSpecialRimHooks[a_, s_:1, \[Lambda]_:{}] := 
    (Join[RemoveRimHook[a, #1, s], {Append[\[Lambda], Last[#1]]}] & ) /@ 
     PossibleSpecialRimHooks[a]
 
RemoveRimHook[a_, {p_, k_}, s_:1] := 
    {DropRightOnes[DropLeftZeros[Table[If[i == p || i == p + k, 1 - a[[i]], 
         a[[i]]], {i, Length[a]}]]], s*(-1)^Count[a[[p + 1 ;; p + k - 1]], 1]}
 
DropRightOnes[a_] := a[[1 ;; -LengthWhile[Reverse[a], #1 == 1 & ] - 1]]
 
DropLeftZeros[a_] := a[[LengthWhile[a, #1 == 0 & ] + 1 ;; All]]
 
PossibleSpecialRimHooks[a_] := ({#1, Length[a] - #1} & ) /@ 
     Flatten[Position[a, 1]]
 
PartitionToAbaci[\[Lambda]_, a_:{}] := If[\[Lambda] == {}, a, 
     PartitionToAbaci[Most[\[Lambda]], Join[{1}, 
       Table[0, Last[\[Lambda]] - Count[a, 0]], a]]]
 
ElementaryToSchur[n_] := ElementaryToSchur[n] = Inverse[SchurToElementary[n]]
 
SchurToElementary[n_] := SchurToElementary[n] = SchurToHomogeneous[n] . 
      ConjugationMatrix[n]
 
ConjugationMatrix[n_] := Normal[PermutationMatrix[
      Flatten[(Position[IntegerPartitions[n], #1] & ) /@ 
        ConjugatePartition /@ IntegerPartitions[n]]]]
 
ConjugatePartition[\[Lambda]_] := 
    Table[Length[Select[\[Lambda], #1 >= i & ]], {i, Max[\[Lambda]]}]
 
ElementaryToMonomial[n_] := ElementaryToMonomial[n] = 
     Inverse[MonomialToElementary[n]]
 
MonomialToElementary[n_] := MonomialToElementary[n] = 
     SchurToElementary[n] . MonomialToSchur[n]
 
ElementaryToPower[n_] := Inverse[PowerToElementary[n]]
 
PowerToElementary[n_] := PowerToElementary[n] = SchurToElementary[n] . 
      PowerToSchur[n]
 
PowerToSchur[n_] := PowerToSchur[n] = Table[\[Chi][\[Lambda], \[Mu]], 
      {\[Lambda], IntegerPartitions[n]}, {\[Mu], IntegerPartitions[n]}]
 
\[Chi][\[Lambda]_, \[Mu]_] := RimHookTableaux[PartitionToAbaci[\[Lambda]], 
     \[Mu]]
 
RimHookTableaux[a_, \[Lambda]_] := Module[{\[Mu] = \[Lambda], 
      RHT = {{a, 1}}}, While[\[Mu] != {}, 
       RHT = Flatten[(RemoveKRimHook[First[#1], First[\[Mu]], 
             Last[#1]] & ) /@ RHT, 1]; \[Mu] = Rest[\[Mu]]]; 
      Total[Last /@ RHT]]
 
RemoveKRimHook[a_, k_, s_:1] := (RemoveRimHook[a, #1, s] & ) /@ 
     Select[PossibleRimHooks[a], Last[#1] == k & ]
 
PossibleRimHooks[a_] := Select[Flatten[Table[{j, i - j}, 
       {i, Flatten[Position[a, 0]]}, {j, Flatten[Position[a, 1]]}], 1], 
     Last[#1] > 0 & ]
 
HomogeneousToElementary[n_] := HomogeneousToElementary[n] = 
     SchurToElementary[n] . HomogeneousToSchur[n]
 
HomogeneousToSchur[n_] := HomogeneousToSchur[n] = 
     Transpose[SchurToMonomial[n]]
 
SchurToMonomial[n_] := SchurToMonomial[n] = Inverse[MonomialToSchur[n]]
 
HomogeneousToMonomial[n_] := HomogeneousToMonomial[n] = 
     Inverse[MonomialToHomogeneous[n]]
 
MonomialToHomogeneous[n_] := MonomialToHomogeneous[n] = 
     SchurToHomogeneous[n] . MonomialToSchur[n]
 
HomogeneousToPower[n_] := Inverse[PowerToHomogeneous[n]]
 
PowerToHomogeneous[n_] := PowerToHomogeneous[n] = SchurToHomogeneous[n] . 
      PowerToSchur[n]
 
PowerToMonomial[n_] := PowerToMonomial[n] = Inverse[MonomialToPower[n]]
 
MonomialToPower[n_] := MonomialToPower[n] = SchurToPower[n] . 
      MonomialToSchur[n]
 
SchurToPower[n_] := SchurToPower[n] = Inverse[PowerToSchur[n]]
 
OmegaElementary[n_] := OmegaElementary[n] = SchurToElementary[n] . 
      ConjugationMatrix[n] . ElementaryToSchur[n]
 
OmegaHomogeneous[n_] := OmegaHomogeneous[n] = SchurToHomogeneous[n] . 
      ConjugationMatrix[n] . HomogeneousToSchur[n]
 
OmegaMonomial[n_] := OmegaMonomial[n] = SchurToMonomial[n] . 
      ConjugationMatrix[n] . MonomialToSchur[n]
 
OmegaPower[n_] := OmegaPower[n] = SchurToPower[n] . ConjugationMatrix[n] . 
      PowerToSchur[n]
 
OmegaSchur[n_] := OmegaSchur[n] = ConjugationMatrix[n]
ElementaryToHomogeneous[n_] := ElementaryToHomogeneous[n] = 
     SchurToHomogeneous[n] . ElementaryToSchur[n]
 
SchurToHomogeneous[n_] := SchurToHomogeneous[n] = 
     Transpose[MonomialToSchur[n]]
 
MonomialToSchur[n_] := MonomialToSchur[n] = 
     Table[InverseKostkaRow[\[Lambda]], {\[Lambda], IntegerPartitions[n]}]
 
InverseKostkaRow[\[Lambda]_] := 
    Table[Total[First /@ Select[SpecialRimHookTableaux[PartitionToAbaci[
          \[Lambda]]], Last[#1] == \[Mu] & ]], 
     {\[Mu], IntegerPartitions[Total[\[Lambda]]]}]
 
SpecialRimHookTableaux[a_, s_:1, \[Lambda]_:{}] := 
    If[a == {}, {{s, ReverseSort[\[Lambda]]}}, 
     Flatten[SpecialRimHookTableaux @@@ RemoveSpecialRimHooks[a, s, 
        \[Lambda]], 1]]
 
RemoveSpecialRimHooks[a_, s_:1, \[Lambda]_:{}] := 
    (Join[RemoveRimHook[a, #1, s], {Append[\[Lambda], Last[#1]]}] & ) /@ 
     PossibleSpecialRimHooks[a]
 
RemoveRimHook[a_, {p_, k_}, s_:1] := 
    {DropRightOnes[DropLeftZeros[Table[If[i == p || i == p + k, 1 - a[[i]], 
         a[[i]]], {i, Length[a]}]]], s*(-1)^Count[a[[p + 1 ;; p + k - 1]], 1]}
 
DropRightOnes[a_] := a[[1 ;; -LengthWhile[Reverse[a], #1 == 1 & ] - 1]]
 
DropLeftZeros[a_] := a[[LengthWhile[a, #1 == 0 & ] + 1 ;; All]]
 
PossibleSpecialRimHooks[a_] := ({#1, Length[a] - #1} & ) /@ 
     Flatten[Position[a, 1]]
 
PartitionToAbaci[\[Lambda]_, a_:{}] := If[\[Lambda] == {}, a, 
     PartitionToAbaci[Most[\[Lambda]], Join[{1}, 
       Table[0, Last[\[Lambda]] - Count[a, 0]], a]]]
 
ElementaryToSchur[n_] := ElementaryToSchur[n] = Inverse[SchurToElementary[n]]
 
SchurToElementary[n_] := SchurToElementary[n] = SchurToHomogeneous[n] . 
      ConjugationMatrix[n]
 
ConjugationMatrix[n_] := Normal[PermutationMatrix[
      Flatten[(Position[IntegerPartitions[n], #1] & ) /@ 
        ConjugatePartition /@ IntegerPartitions[n]]]]
 
ConjugatePartition[\[Lambda]_] := 
    Table[Length[Select[\[Lambda], #1 >= i & ]], {i, Max[\[Lambda]]}]
 
ElementaryToMonomial[n_] := ElementaryToMonomial[n] = 
     Inverse[MonomialToElementary[n]]
 
MonomialToElementary[n_] := MonomialToElementary[n] = 
     SchurToElementary[n] . MonomialToSchur[n]
 
ElementaryToPower[n_] := Inverse[PowerToElementary[n]]
 
PowerToElementary[n_] := PowerToElementary[n] = SchurToElementary[n] . 
      PowerToSchur[n]
 
PowerToSchur[n_] := PowerToSchur[n] = Table[\[Chi][\[Lambda], \[Mu]], 
      {\[Lambda], IntegerPartitions[n]}, {\[Mu], IntegerPartitions[n]}]
 
\[Chi][\[Lambda]_, \[Mu]_] := RimHookTableaux[PartitionToAbaci[\[Lambda]], 
     \[Mu]]
 
RimHookTableaux[a_, \[Lambda]_] := Module[{\[Mu] = \[Lambda], 
      RHT = {{a, 1}}}, While[\[Mu] != {}, 
       RHT = Flatten[(RemoveKRimHook[First[#1], First[\[Mu]], 
             Last[#1]] & ) /@ RHT, 1]; \[Mu] = Rest[\[Mu]]]; 
      Total[Last /@ RHT]]
 
RemoveKRimHook[a_, k_, s_:1] := (RemoveRimHook[a, #1, s] & ) /@ 
     Select[PossibleRimHooks[a], Last[#1] == k & ]
 
PossibleRimHooks[a_] := Select[Flatten[Table[{j, i - j}, 
       {i, Flatten[Position[a, 0]]}, {j, Flatten[Position[a, 1]]}], 1], 
     Last[#1] > 0 & ]
 
HomogeneousToElementary[n_] := HomogeneousToElementary[n] = 
     SchurToElementary[n] . HomogeneousToSchur[n]
 
HomogeneousToSchur[n_] := HomogeneousToSchur[n] = 
     Transpose[SchurToMonomial[n]]
 
SchurToMonomial[n_] := SchurToMonomial[n] = Inverse[MonomialToSchur[n]]
 
HomogeneousToMonomial[n_] := HomogeneousToMonomial[n] = 
     Inverse[MonomialToHomogeneous[n]]
 
MonomialToHomogeneous[n_] := MonomialToHomogeneous[n] = 
     SchurToHomogeneous[n] . MonomialToSchur[n]
 
HomogeneousToPower[n_] := Inverse[PowerToHomogeneous[n]]
 
PowerToHomogeneous[n_] := PowerToHomogeneous[n] = SchurToHomogeneous[n] . 
      PowerToSchur[n]
 
PowerToMonomial[n_] := PowerToMonomial[n] = Inverse[MonomialToPower[n]]
 
MonomialToPower[n_] := MonomialToPower[n] = SchurToPower[n] . 
      MonomialToSchur[n]
 
SchurToPower[n_] := SchurToPower[n] = Inverse[PowerToSchur[n]]
 
OmegaElementary[n_] := OmegaElementary[n] = SchurToElementary[n] . 
      ConjugationMatrix[n] . ElementaryToSchur[n]
 
OmegaHomogeneous[n_] := OmegaHomogeneous[n] = SchurToHomogeneous[n] . 
      ConjugationMatrix[n] . HomogeneousToSchur[n]
 
OmegaMonomial[n_] := OmegaMonomial[n] = SchurToMonomial[n] . 
      ConjugationMatrix[n] . MonomialToSchur[n]
 
OmegaPower[n_] := OmegaPower[n] = SchurToPower[n] . ConjugationMatrix[n] . 
      PowerToSchur[n]
 
OmegaSchur[n_] := OmegaSchur[n] = ConjugationMatrix[n]
