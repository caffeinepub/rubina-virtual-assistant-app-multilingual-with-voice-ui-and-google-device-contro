import Runtime "mo:core/Runtime";

actor {
  public shared ({ caller }) func runPreflightChecks() : async () {
    Runtime.trap("Preflight checks are not supported due to language limitations. Please ensure that all configuration files and directories are correct before deployment.");
  };
};
