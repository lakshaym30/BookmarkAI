from pathlib import Path

def get_root_path():
    # Get the current script path.
    here = Path(__file__).resolve()

    # Go up two levels to the root of your project.
    return here.parent.parent
