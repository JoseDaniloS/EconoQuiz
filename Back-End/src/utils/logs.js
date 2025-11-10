/**
 * Registra mensagens padronizadas com timestamp.
 *
 * @param {string} message - Mensagem que será exibida no log.
 */
export function logMessage(message) {
  const timestamp = new Date().toISOString(); // Formato legível e padronizado
  console.log(`[LOG] ${timestamp} - ${message}`);
}
