// module.exports = {
//     apps: [
//         {
//             name: 'my_react_app',
//             script: 'dist/main.js',
//             instances: 'max', //
//             exec_mode: 'cluster', // fork, cluster
//             merge_logs: true, // . autorestart: true, //
//             watch: false, //
//             // max_memory_restart: "512M", // .
//         },
//     ],
// }

module.exports = {
    apps: [
        {
            name: 'my_react_app',
            script: 'pm2',
            args: 'serve build 8080 --spa', // pm2 serve 명령 및 옵션을 args로 전달
            instances: 1, // 원하는 프로세스 수로 변경
            exec_mode: 'fork', // 실행 모드 선택 (fork 또는 cluster)
            merge_logs: true,
            // autorestart: true, // 필요한 경우 주석 해제
            // watch: false, // 필요한 경우 주석 해제
            // max_memory_restart: "512M", // 필요한 경우 주석 해제 및 값 변경
        },
    ],
}
