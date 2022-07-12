# dhc-jupyter

[![Build Status](https://travis-ci.org/deephaven/dhc-jupyter.svg?branch=master)](https://travis-ci.org/deephaven/dhc_jupyter)
[![codecov](https://codecov.io/gh/deephaven/dhc-jupyter/branch/master/graph/badge.svg)](https://codecov.io/gh/deephaven/dhc-jupyter)

A Custom Jupyter Widget Library

## Building/Running

### Creating Python venv environment

Create and source the python venv environment:

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/openjdk-11.jdk/Contents/Home
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip setuptools
pip install deephaven_server jupyter
```

After initial installation/creation, you can just do

```bash
source .venv/bin/activate
```

### Running in Jupyter lab

To start up jupyter lab, just run the command from your terminal (after sourcing venv):

```bash
jupyter lab
```

### Running in VS Code (WIP)

1. Create a new notebook (.ipynb) or open an existing file
2. Create a `.env` file with your `JAVA_HOME` variable set, e.g.

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/openjdk-11.jdk/Contents/Home
```

3. In the notebook, make sure your `.venv` Python environment is selected - either use the dropdown menu in the top right, or hit `Ctrl + P` then type `> Select Kernel` and select the `Notebook: Select Notebook Kernel` option and choose `.venv`.

## Development

After making changes to the JS part of the extension, run the following to update the JS build.

```bash
yarn run build
```

After making any changes to Python or JS then run the following to update in the jupyter env:

```bash
jupyter labextension develop --overwrite .
```

## Installation

You can install using `pip`:

```bash
pip install dhc_jupyter
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:

```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] dhc_jupyter
```

## (DEPRECATED) Development Installation

Create a dev environment:

```bash
conda create -n dhc_jupyter-dev -c conda-forge nodejs yarn python jupyterlab
conda activate dhc_jupyter-dev
```

Install the python. This will also build the TS package.

```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py dhc_jupyter
jupyter nbextension enable --sys-prefix --py dhc_jupyter
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Typescript:

If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.
