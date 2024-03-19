process.on("exit", (code) =>
  console.log("The process has been ended with code " + code)
);

process.on("uncaughtException", (error) =>
  console.log("Se ha producido un error: " + error.message)
);

console.log(process.pid);
process.pid();
process.exit(0);
