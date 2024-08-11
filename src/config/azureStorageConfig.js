const { BlobServiceClient } = require('@azure/storage-blob');

// Cadena de conexión de Azure Storage
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=imagenes224;AccountKey=uaxwFg318S3NhZOqptbwWdWRxRMPP5b5cVKqXSqLM4di6TXXBuMFPGMTWVXurNITzxtqCpP1VYDZ+AStNRpdyw==;EndpointSuffix=core.windows.net';

// Nombre del contenedor en Azure Blob Storage
const CONTAINER_NAME = 'imagenes224';

// Crear el cliente de servicio Blob
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

module.exports = containerClient;
