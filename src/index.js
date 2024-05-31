"use strict";

const fs = require("fs-extra");
const path = require("path");

async function replaceUploadsFolder({ sourceDir, destDir }) {
  try {
    // Remove the destination directory if it exists
    if (fs.existsSync(destDir)) {
      await fs.remove(destDir);
      console.log(`Removed existing directory: ${destDir}`);
    }

    // Copy the source directory to the destination
    await fs.copy(sourceDir, destDir);
    console.log(`Copied ${sourceDir} to ${destDir}`);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
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
    if (process.env.NODE_ENV === "production") {
      const sourceDir = path.join("/", "uploads");
      const destDir = path.join(__dirname, "public", "uploads");

      replaceUploadsFolder({ sourceDir, destDir });

      strapi.db.lifecycles.subscribe({
        models: ["plugin::upload.file"],
        async afterCreate() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          replaceUploadsFolder({ sourceDir, destDir });
        },
        async afterUpdate() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          replaceUploadsFolder({ sourceDir, destDir });
        },
        async afterDelete() {
          const sourceDir = path.join(__dirname, "public", "uploads");
          const destDir = path.join("/", "uploads");

          replaceUploadsFolder({ sourceDir, destDir });
        },
      });
    }
  },
};
