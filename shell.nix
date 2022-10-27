{ pkgs ? import <nixpkgs> {} }:

let
  pythonEnv = with pkgs.python311Packages; [
    ipython
    jupyter
    jupyterlab
    matplotlib
    panel
    pandas
    plotly
    numpy
    rich
    seaborn
    ipywidgets
  ];

in pkgs.mkShell {
  buildInputs = with pkgs; [
    python311
    pythonEnv

    # keep this line if you use bash
    # pkgs.bashInteractive
  ];
}
