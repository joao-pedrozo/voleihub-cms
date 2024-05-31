const { exec } = require("child_process");

module.exports = {
  init(providerOptions) {
    console.log(31289391831, __dirname);

    exec("ls /", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
      }

      // Print the standard output of the command
      console.log(`Output:\n${stdout}`);
    });

    return {
      upload(file) {
        // upload the file in the provider
        // file content is accessible by `file.buffer`
      },
      uploadStream(file) {
        // upload the file in the provider
        // file content is accessible by `file.stream`
      },
      delete(file) {
        // delete the file in the provider
      },
      checkFileSize(file, { sizeLimit }) {
        // (optional)
        // implement your own file size limit logic
      },
      getSignedUrl(file) {
        // (optional)
        // Generate a signed URL for the given file.
        // The signed URL allows secure access to the file.
        // Only Content Manager assets will be signed.
        // Returns an object {url: string}.
      },
      isPrivate() {
        // (optional)
        // if it is private, file urls will be signed
        // Returns a boolean
      },
    };
  },
};
