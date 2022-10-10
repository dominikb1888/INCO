{ pkgs ? import <nixpkgs> {} }:

let
  pythonEnv = with pkgs.python310Packages; [
    ipython
    jupyter
    jupyterlab
    matplotlib
    pandas
    plotly
    numpy
    rich
  ];

in pkgs.mkShell {
  buildInputs = with pkgs; [
    pythonEnv

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
