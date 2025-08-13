import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, model, target_language_code, speaker } = body;

    // You'll need to add your Sarvam AI API key here
    const API_KEY = process.env.SARVAM_AI_API_KEY;
    
    if (!API_KEY) {
      throw new Error('Sarvam AI API key not configured');
    }

    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model: model || "bulbul:v2",
        target_language_code: target_language_code || "en-IN",
        speaker: speaker || "anushka",
        audio_format: "wav"
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam AI API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      audio: data.audios[0] // Sarvam AI returns audio in 'audios' array
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { error: 'Text-to-speech conversion failed' },
      { status: 500 }
    );
  }
}