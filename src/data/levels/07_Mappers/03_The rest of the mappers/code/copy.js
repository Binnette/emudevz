["SuggestedImprovements.en.md", "SuggestedImprovements.es.md"].forEach(
	(file) => {
		filesystem.write(`${Drive.DOCS_DIR}/${file}`, level.bin[file]);
	}
);
