{ pkgs ? import <nixpkgs> {} }:

let
  pythonEnv = with pkgs.python310Packages; [
    ipython
    rich

    jupyterlab
    numpy
    pandas
    matplotlib

    plotly
    seaborn

    # streamlit
    dash

    pytest

    ipympl
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
