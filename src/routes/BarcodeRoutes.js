import express from 'express';
import bearer from '../middlewares/bearer';
import Barcode from '../models/Barcode';
import log from '../services/Logging';

const router = express.Router();

router.get('/', bearer, (req, res) => {
  log.info('GET find barcode');
  log.info(req.query);

  if (req.query === undefined) {
    const errMsg = 'В запросе отсутствует штрих-код';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  if (!req.query.barcode) {
    const errMsg = 'В параметре запроса не заполнен штрих-код';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  const barcodeNumber = parseInt(req.query.barcode);
  if (isNaN(barcodeNumber)) {
    const errMsg = 'Ошибка: штрих-код должен быть числом';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  Barcode.findOne({ UPCEAN: barcodeNumber }, (err, result) => {
    if (err) {
      const errMsg = 'Ошибка при выполнении запроса поиска штрих-кода';
      log.error(errMsg);
      log.error(err);
      return res.status(400).send({ result: errMsg });
    }
    if (!result) {
      const errMsg = 'Штрих-код не найден';
      log.error(errMsg);
      return res.status(400).send({ result: errMsg });
    }
    return res.status(200).send({ result });
  });
});

export default router;
