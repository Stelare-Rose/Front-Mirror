{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";
  };

  outputs = { self, nixpkgs }@inputs:
    let
      system = "x86_64-linux";

      pkgs = import inputs.nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell rec {
        name = "Mirror";
        packages = with pkgs; [
          bun
          nodejs_22         

          typescript
          typescript-language-server

          vue-language-server
          svelte-language-server

          vscode-langservers-extracted
          eslint
          prettier
        ];
        shellHook = "tmux -L ${name} new-session -A -s ${name}";
      };
    };
}
