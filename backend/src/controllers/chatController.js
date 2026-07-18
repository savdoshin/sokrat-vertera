const deepseekService = require('../services/deepseekService');

class ChatController {
  async sendMessage(req, res) {
    try {
      const { message, scenario, history } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Сообщение не может быть пустым' });
      }

      const response = await deepseekService.getSocraticResponse(
        message,
        scenario,
        history || []
      );

      res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: 'Ошибка при получении ответа от Сократа',
        details: error.message 
      });
    }
  }
}

module.exports = new ChatController();
