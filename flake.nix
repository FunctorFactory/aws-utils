{
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixpkgs-unstable";
    };

    flake-utils = {
      url = "github:numtide/flake-utils";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      corepackEnable = pkgs.runCommand "corepack-enable" {} ''
        mkdir -p $out/bin
        ${pkgs.nodePackages.nodejs}/bin/corepack enable --install-directory $out/bin
      '';
    in {
      formatter = pkgs.alejandra;

      devShells = {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.nodejs
            corepackEnable
          ];
        };
      };
    });
}
