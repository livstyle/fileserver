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
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(filename) + ".xlsx");

        // @ts-ignore
        workbook.stream.pipe(res);

        for (let index = 0; index < 500000; index++) {
            const row = [];
            for (let i = 0; i < 20; i++) {
                row.push(i);
            }
            worksheet.addRow(row).commit();
        }
        await workbook.commit();

    }

}