"use strict";

const fs = require("fs-extra");
const path = require("path");

async function copyUploadsFolder({ sourceDir, destDir }) {
  try {
    // Ensure the destination directory exists
    await fs.ensureDir(destDir);

    console.log(`Copying contents of ${sourceDir} to ${destDir}`);
    await fs.copy(sourceDir, destDir, { overwrite: true });
    console.log(`Copied contents of ${sourceDir} to ${destDir}`);
  } catch (err) {
    if (err.code === "EACCES") {
      console.error(`Permission error: ${err.message}`);
    } else if (err.code === "EBUSY") {
      console.error(`Resource busy error: ${err.message}`);
    } else {
      console.error(`Error occurred: ${err.message}`);
    }
  }
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    console.log(111);

    if (process.env.NODE_ENV === "production") {
      console.log(222);

      const sourceDir = path.join("/", "uploads");
      const destDir = path.join(__dirname, "public", "uploads");

      copyUploadsFolder({ sourceDir, destDir });

      strapi.db.lifecycles.subscribe({
        models: ["plugin::upload.file"],
        async afterCreate() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          copyUploadsFolder({ sourceDir, destDir });
        },
        async afterUpdate() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          copyUploadsFolder({ sourceDir, destDir });
        },
        async afterDelete() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          copyUploadsFolder({ sourceDir, destDir });
        },
      });
    }
  },
};
