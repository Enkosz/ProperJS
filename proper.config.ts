import path from "path";

export default {
    scan: path.join(process.cwd(), 'properjs/src'),
    components: [
        {
            provide: 'PROVIDER',
            useValue: ''
        }
    ]
}
