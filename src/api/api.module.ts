import ExcelJS from 'exceljs';
import { MRoute } from "../common/decorators/MRoute";

export class Api {
    constructor() {}

    @MRoute('/api/get')
    getA(req: any, res: any) {
        res.status(200).json({ data: 'asasa', status: '0' });
    }

    @MRoute('/api/file')
    async getExcel(req: any, res: any) {
        const options = {
            useStyles: true,
            useSharedStrings: true
        };
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options);

        const worksheet = workbook.addWorksheet('数据流', { views: [{ state: 'frozen', xSplit: 1, ySplit: 3 }] });

        let filename = "数据流表";
        res.setHeader('Connection', 'keep-alive'); // 保持链接一直在
        res.setHeader('Content-Type', 'application/octet-stream'); // 文件类型为文件流形式
        res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(filename) + ".xlsx");
        res.flushHeaders(); // 先将headers返回

        // @ts-ignore
        workbook.stream.pipe(res); // 使用管道流将xlsx流数据直接写入response流中

        for (let index = 0; index < 500000; index++) {
            const row = [];
            for (let i = 0; i < 20; i++) {
                row.push(i);
            }
            worksheet.addRow(row).commit(); // commit() 提交流数据
        }
        workbook.commit(); // 提交整个Excel工作簿

    }

}