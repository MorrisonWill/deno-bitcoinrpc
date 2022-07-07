with import <nixpkgs> { };
mkShell { nativeBuildInputs = with pkgs; [ deno nodePackages.prettier ]; }
