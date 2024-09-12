const {Translate} = require('@google-cloud/translate').v2;

const CREDENTIALS =require('../utils/tscl-434007-dac924e90848.json')

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const translateText = async (text, targetLanguage) => {
    try {
      let [response] = await translate.translate(text, {
        to: targetLanguage,
      });
      return response;
    } catch (error) {
      console.log(`Error at translateText --> ${error}`);
      return 0;
    }
  };
  
  exports.translate = async (req, res, next) => {
    try {
        const { text, targetLanguage } = req.body;
        const translatedText = await translateText(text, targetLanguage);
        res.json({ translatedText });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  


