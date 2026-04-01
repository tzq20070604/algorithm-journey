//https://www.nowcoder.com/practice/7094c42a67164e66a482399cd6336d32?tpId=390&tqId=11534950&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D390
const rl = require("readline").createInterface({ 
    input: process.stdin,
    terminal: false,
    crlfDelay: Infinity
});

var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 全局常量/变量（对应C++的全局定义）
const INF = 1e9;
let r_max, c_max;
let grid = [];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

void async function () {
    // ========== 输入读取（完全保持你的版本） ==========
    const firstLine = await readline();
    const firstLineArray = firstLine.trim().split(' ');
    r_max = parseInt(firstLineArray[0]);
    c_max = parseInt(firstLineArray[1]);

    grid = new Array(r_max);
    const stations = []; // 存储补给站坐标
    for (let i = 0; i < r_max; i++) {
        const line = await readline();
        grid[i] = line.trim().split(' ').map(Number);
        for (let j = 0; j < c_max; j++) {
            if (grid[i][j] === 2) {
                stations.push([i, j]);
            }
        }
    }

    // 读取起点、终点、k
    const threeLine = await readline();
    const [start_r, start_c] = threeLine.trim().split(' ').map(Number);
    const twoLine = await readline();
    const [dest_r, dest_c] = twoLine.trim().split(' ').map(Number);
    const oneLine = await readline();
    const k = parseInt(oneLine.trim());

    // 起点等于终点直接返回0
    if (start_r === dest_r && start_c === dest_c) {
        console.log(0);
        return;
    }
    
    // ========== 1. 计算补给站之间的距离（多源BFS） ==========
    const num_stations = stations.length;
    const start_id = num_stations;
    const dest_id = num_stations + 1;
    const num_meta_nodes = num_stations + 2;
    const meta_adj = Array.from({ length: num_meta_nodes }, () => []);

    if (num_stations > 0) {
        // 初始化距离和归属数组
        const dist_to_station = Array.from({ length: r_max }, () => Array(c_max).fill(INF));
        const owner = Array.from({ length: r_max }, () => Array(c_max).fill(-1));
        const q = [];

        // 多源BFS初始化
        for (let i = 0; i < num_stations; i++) {
            const [r, c] = stations[i];
            dist_to_station[r][c] = 0;
            owner[r][c] = i;
            q.push([r, c]);
        }

        // 多源BFS遍历
        let qPtr = 0;
        while (qPtr < q.length) {
            const [curr_r, curr_c] = q[qPtr++];
            for (let i = 0; i < 4; i++) {
                const nr = curr_r + dr[i];
                const nc = curr_c + dc[i];
                if (is_valid(nr, nc) && owner[nr][nc] === -1) {
                    owner[nr][nc] = owner[curr_r][curr_c];
                    dist_to_station[nr][nc] = dist_to_station[curr_r][curr_c] + 1;
                    q.push([nr, nc]);
                }
            }
        }

        // 计算补给站之间的最短路径
        const station_dist = new Map();
        for (let r = 0; r < r_max; r++) {
            for (let c = 0; c < c_max; c++) {
                for (let i = 0; i < 4; i++) {
                    const nr = r + dr[i];
                    const nc = c + dc[i];
                    if (is_valid(nr, nc) && owner[r][c] !== -1 && owner[nr][nc] !== -1 && owner[r][c] !== owner[nr][nc]) {
                        const u = owner[r][c];
                        const v = owner[nr][nc];
                        const w = dist_to_station[r][c] + dist_to_station[nr][nc] + 1;
                        const key = `${Math.min(u, v)},${Math.max(u, v)}`;
                        if (!station_dist.has(key) || w < station_dist.get(key)) {
                            station_dist.set(key, w);
                        }
                    }
                }
            }
        }

        // 构建补给站之间的邻接表
        station_dist.forEach((w, key) => {
            if (w <= k) {
                const [u, v] = key.split(',').map(Number);
                meta_adj[u].push([v, w]);
                meta_adj[v].push([u, w]);
            }
        });
    }

    // ========== 2. 计算起点到其他关键点的距离 ==========
    const start_targets = [...stations];
    start_targets.push([dest_r, dest_c]);
    const start_dists = k_limited_bfs(start_r, start_c, k, start_targets);
    // 起点到终点
    if (start_dists[start_dists.length - 1] <= k) {
        meta_adj[start_id].push([dest_id, start_dists[start_dists.length - 1]]);
    }
    // 起点到补给站
    for (let i = 0; i < num_stations; i++) {
        if (start_dists[i] <= k) {
            meta_adj[start_id].push([i, start_dists[i]]);
        }
    }

    // ========== 3. 计算补给站到终点的距离 ==========
    if (num_stations > 0) {
        const dest_dists = k_limited_bfs(dest_r, dest_c, k, stations);
        for (let i = 0; i < num_stations; i++) {
            if (dest_dists[i] <= k) {
                meta_adj[i].push([dest_id, dest_dists[i]]);
            }
        }
    }

    // ========== 4. Dijkstra算法求解最短路径 ==========
    const pq = new MinHeap();
    const final_dist = new Array(num_meta_nodes).fill(INF);
    final_dist[start_id] = 0;
    pq.push(new DijkstraState(start_id, 0));

    while (!pq.isEmpty()) {
        const current = pq.pop();
        const u = current.u;
        if (current.dist > final_dist[u]) continue;
        if (u === dest_id) break;

        for (const [v, weight] of meta_adj[u]) {
            if (final_dist[u] + weight < final_dist[v]) {
                final_dist[v] = final_dist[u] + weight;
                pq.push(new DijkstraState(v, final_dist[v]));
            }
        }
    }

    // ========== 输出结果 ==========
    if (final_dist[dest_id] === INF) {
        console.log(-1);
    } else {
        console.log(final_dist[dest_id]);
    }
}();

// 判断坐标是否合法（对应C++的is_valid）
function is_valid(r, c) {
    return r >= 0 && r < r_max && c >= 0 && c < c_max && grid[r][c] !== 1;
}

// 限制步数的BFS（对应C++的k_limited_bfs）
function k_limited_bfs(start_r, start_c, k, targets) {
    const results = new Array(targets.length).fill(INF);
    if (!is_valid(start_r, start_c)) return results;

    // 目标坐标到索引的映射（替代C++的map）
    const target_coord_to_idx = new Map();
    targets.forEach(([tr, tc], idx) => {
        target_coord_to_idx.set(`${tr},${tc}`, idx);
    });

    // BFS队列和距离数组
    const q = [];
    const d = Array.from({ length: r_max }, () => Array(c_max).fill(-1));
    q.push({ r: start_r, c: start_c, dist: 0 });
    d[start_r][start_c] = 0;

    // 检查起点是否是目标点
    const startKey = `${start_r},${start_c}`;
    if (target_coord_to_idx.has(startKey)) {
        results[target_coord_to_idx.get(startKey)] = 0;
    }
     
    let qPtr = 0;
    while (qPtr < q.length) {
        const current = q[qPtr++];
        if (current.dist >= k) continue;

        for (let i = 0; i < 4; i++) {
            const nr = current.r + dr[i];
            const nc = current.c + dc[i];
            if (is_valid(nr, nc) && d[nr][nc] === -1) {
                d[nr][nc] = current.dist + 1;
                q.push({ r: nr, c: nc, dist: d[nr][nc] });
                const key = `${nr},${nc}`;
                if (target_coord_to_idx.has(key)) {
                    results[target_coord_to_idx.get(key)] = d[nr][nc];
                }
            }
        }
    }
    return results;
}

// DijkstraState比较函数（模拟C++的greater）
class DijkstraState {
    constructor(u, dist) {
        this.u = u;
        this.dist = dist;
    }
}

// 最小堆实现（对应C++的priority_queue）
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(state) {
        this.heap.push(state);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(idx) {
        while (idx > 0) {
            const pIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx].dist >= this.heap[pIdx].dist) break;
            [this.heap[idx], this.heap[pIdx]] = [this.heap[pIdx], this.heap[idx]];
            idx = pIdx;
        }
    }

    bubbleDown(idx) {
        const len = this.heap.length;
        while (true) {
            let minIdx = idx;
            const lIdx = idx * 2 + 1;
            const rIdx = idx * 2 + 2;
            if (lIdx < len && this.heap[lIdx].dist < this.heap[minIdx].dist) minIdx = lIdx;
            if (rIdx < len && this.heap[rIdx].dist < this.heap[minIdx].dist) minIdx = rIdx;
            if (minIdx === idx) break;
            [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
            idx = minIdx;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
