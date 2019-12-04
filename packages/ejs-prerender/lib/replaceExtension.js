module.exports = (oldExtension, newExtension, path) => `${path.substring(0, path.length - oldExtension.length)}${newExtension}`;
