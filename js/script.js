let report = [];
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let newKey = ["Номер отчёта", "Дата начала отчётного периода", "Дата конца отчётного периода", "Дата формирования отчёта", "Договор", "Номер строки", "Номер поставки", "Предмет", "Артикул WB", "Бренд", "Артикул продавца", "Размер", "Баркод", "Тип документа", "Количество", "Цена розничная", "Сумма продаж (возвратов)", "Согласованная скидка", "Процент комиссии", "Склад", "Обоснование для оплаты", "Дата заказа.", "Дата продажи.", "Дата операции.", "Штрих-код", "Цена розничная с учетом согласованной скидки", "Количество доставок", "Количество возвратов", "Стоимость логистики", "Тип коробов", "Согласованный продуктовый дисконт", "Промокод", "Уникальный идентификатор заказа", "Скидка постоянного покупателя", "Размер кВВ без НДС, % базовый", "Итоговый кВВ без НДС, %", "Размер снижения кВВ из-за рейтинга, % new", "Размер снижения кВВ из-за акции, % new", "Вознаграждение с продаж до вычета услуг поверенного, без НДС", "К перечислению продавцу за реализованный товар", "Возмещение за выдачу и возврат товаров на ПВЗ", "Возмещение издержек по эквайрингу.", "Наименование банка-эквайера", "Вознаграждение WB без НДС", "НДС с вознаграждения WB", "Номер офиса", "Наименование офиса доставки", "Номер партнера", "Партнер", "ИНН партнера", "Номер таможенной декларации", "Обоснование штрафов и доплат.", "Цифровое значение стикера, который клеится на товар в процессе сборки заказа по схеме Маркетплейс", "Страна продажи", "Штрафы", "Доплаты", "Возмещение издержек по перевозке. new", "Организатор перевозки. new", "Код маркировки.", "Уникальный идентификатор заказа. Примечание для использующих API Marketplace: srid равен rid в ответах методов сборочных заданий."];
let oldKey = ["realizationreport_id", "date_from", "date_to", "create_dt", "suppliercontract_code", "rrd_id", "gi_id", "subject_name", "nm_id", "brand_name", "sa_name", "ts_name", "barcode", "doc_type_name", "quantity", "retail_price", "retail_amount", "sale_percent", "commission_percent", "office_name", "supplier_oper_name", "order_dt", "sale_dt", "rr_dt", "shk_id", "retail_price_withdisc_rub", "delivery_amount", "return_amount", "delivery_rub", "gi_box_type_name", "product_discount_for_report", "supplier_promo", "rid", "ppvz_spp_prc", "ppvz_kvw_prc_base", "ppvz_kvw_prc", "sup_rating_prc_up", "is_kgvp_v2", "ppvz_sales_commission", "ppvz_for_pay", "ppvz_reward", "acquiring_fee", "acquiring_bank", "ppvz_vw", "ppvz_vw_nds", "ppvz_office_id", "ppvz_office_name", "ppvz_supplier_id", "ppvz_supplier_name", "ppvz_inn", "declaration_number", "bonus_type_name", "sticker_id", "site_country", "penalty", "additional_payment", "rebill_logistic_cost", "rebill_logistic_org", "kiz", "srid"];

function fChangeKeyName() {
  for (let i = 0; i < report[0].length; i++) {
    for (let j = 0; j < newKey.length; j++) {
      report[0][i][newKey[j]] = report[0][i][oldKey[j]];
      delete report[0][i][oldKey[j]];
    }
  }
}

const getReport = async () => {
  const promise = new Promise (async (resolve, reject) => {
      const res = await fetch (`https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod?dateFrom=${start.value}&dateTo=${end.value}&rrdid=0&limit=100000`, {
            headers: {
             Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6ImI4NTJjNjNmLTM2NGQtNGI1Yy05OGY2LWEyOGRmNDM1MWYwZSJ9.OF6bcGjcT6D0fnF_FiVYNXxd2dgpRDyv_fYu_sN14mE',
               'Content-Type': 'application/json',
           }
          });
      const data = res.json();
      resolve(data);
  })
  promise.then(data=> {
    fChangeKeyName()
    alert('Отчет загружен')
      report.push(data)
  }).catch(() => {
    alert('error')  
});
}

function GettingReport() {
var stockList = XLSX.utils.json_to_sheet(report[0]);
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, stockList, 'report');
XLSX.writeFile(wb, 'report.xlsx');
}
 