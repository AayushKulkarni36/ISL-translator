using System;

namespace SignPlayer
{
class Program
{
static void Main(string[] args)
{
if (args.Length == 0)
{
Console.WriteLine("Please provide a video file path.");
return;
}        string path = args[0];
        VideoPlayer.Play(path);
    }
}
}