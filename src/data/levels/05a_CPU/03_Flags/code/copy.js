["flags.en.md", "flags.es.md"].forEach((file) => {
	filesystem.write(`${Drive.DOCS_DIR}/cpu/${file}`, level.bin[file]);
});
