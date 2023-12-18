{ pkgs ? import <nixpkgs> {} }:

let
  pythonEnv = with pkgs.python310Packages; [
    ipython
    rich

    jupyterlab
    numpy
    pandas
    matplotlib

    geojson
    geopandas
    plotly
    seaborn

    # streamlit
    # dash

    flask

    pytest
    sparqlwrapper

    ipympl
    ipywidgets
    pdftotext

    # Session 04
    requests
    urllib3
    httplib2
    httpx

    python-dotenv
  ];

in pkgs.mkShell {
  buildInputs = with pkgs; [
    python311
    pythonEnv
    nodePackages.ijavascript
    # keep this line if you use bash
    # pkgs.bashInteractive
  ];
}
