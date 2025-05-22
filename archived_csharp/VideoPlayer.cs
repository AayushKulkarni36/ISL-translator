using System;
using System.Diagnostics;

namespace SignPlayer
{
class VideoPlayer
{
public static void Play(string filePath)
{
try
{
Process.Start(new ProcessStartInfo
{
FileName = filePath,
UseShellExecute = true
});
}
catch (Exception ex)
{
Console.WriteLine("Error playing video: " + ex.Message);
}
}
}
}