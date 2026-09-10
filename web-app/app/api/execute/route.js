import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

export async function POST(req) {
  try {
    const body = await req.json();
    const { algorithm, engine, args } = body;

    if (!algorithm || !engine || !args || !Array.isArray(args)) {
      return new Response(JSON.stringify({ error: 'Missing or invalid required fields (algorithm, engine, args)' }), { status: 400 });
    }

    const algorithmsDir = path.resolve(process.cwd(), '..');

    if (engine === 'Java') {
      try {
        const javaDir = path.join(algorithmsDir, 'Java');
        const javaExe = 'C:\\Users\\alzir\\java\\java-1.8.0-openjdk-1.8.0.504.b01-1.win.jdk.x86_64\\bin\\java.exe';
        // Command: java -cp <javaDir> Runner <algorithm> <args...>
        const { stdout, stderr } = await execFileAsync(javaExe, ['-cp', javaDir, 'Runner', algorithm, ...args.map(String)]);
        
        if (stderr && stderr.trim().length > 0 && !stdout.trim().startsWith('{')) {
          console.error("Java Error:", stderr);
        }

        try {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.error) {
            return new Response(JSON.stringify({ error: parsed.error }), { status: 500 });
          }
          return new Response(JSON.stringify({ result: parsed.result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } catch (parseErr) {
          return new Response(JSON.stringify({ error: 'Failed to parse Java output as JSON.', output: stdout }), { status: 500 });
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
           return new Response(JSON.stringify({ error: 'Java is not installed or not available in the system PATH.' }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: `Java execution failed: ${err.message}` }), { status: 500 });
      }
    } else if (engine === 'JavaScript') {
      try {
        const jsRunnerPath = path.join(process.cwd(), 'js-runner.js');
        // Command: node js-runner.js <algorithm> <args...>
        const { stdout, stderr } = await execFileAsync('node', [jsRunnerPath, algorithm, ...args.map(String)]);
        
        try {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.error) {
            return new Response(JSON.stringify({ error: parsed.error }), { status: 500 });
          }
          return new Response(JSON.stringify({ result: parsed.result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } catch (parseErr) {
          return new Response(JSON.stringify({ error: 'Failed to parse JavaScript output as JSON.', output: stdout }), { status: 500 });
        }
      } catch (err) {
         if (err.code === 'ENOENT') {
           return new Response(JSON.stringify({ error: 'Node.js is not available in the system PATH.' }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: `JavaScript execution failed: ${err.message}` }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ error: 'Unknown engine selected' }), { status: 400 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
