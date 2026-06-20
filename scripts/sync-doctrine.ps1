param(
  [string]$PagePath = (Join-Path $PSScriptRoot '..\pages\declaracao-doutrinaria.html')
)

$ErrorActionPreference = 'Stop'
$sourceUrl = 'https://convencaobatista.com.br/site/pagina.php?MEN_ID=22'
$response = Invoke-WebRequest -Uri $sourceUrl -UseBasicParsing -TimeoutSec 60
$html = $response.Content

$token = '<div class="col-md-12 conteudo">'
$start = $html.IndexOf($token, [StringComparison]::OrdinalIgnoreCase)
if ($start -lt 0) { throw 'Bloco da declaração não encontrado na fonte oficial.' }
$start += $token.Length
$end = $html.IndexOf('</div>', $start, [StringComparison]::OrdinalIgnoreCase)
if ($end -lt 0) { throw 'Fim do bloco da declaração não encontrado.' }

$content = $html.Substring($start, $end - $start)
$content = $content -replace '<script[\s\S]*?</script>', ''
$content = $content -replace '<style[\s\S]*?</style>', ''
$content = $content -replace '<span[^>]*>', ''
$content = $content -replace '</span>', ''
$content = $content -replace '<h4[^>]*>', '<p>'
$content = $content -replace '</h4>', '</p>'
$content = $content -replace '<p[^>]*>', '<p>'
$content = $content -replace '<br\s*/?>\s*<br\s*/?>', '</p><p>'
$content = $content -replace '<br\s*/?>', '<br>'
$content = $content -replace '&nbsp;', ' '
$content = $content -replace '<p>\s*</p>', ''
$content = $content -replace '[\r\n]+', "`n"

$content = [regex]::Replace($content, '<p>\s*<strong>INTRODU&Ccedil;&Atilde;O</strong>\s*</p>', '<h2 id="introducao">INTRODU&Ccedil;&Atilde;O</h2>', 'IgnoreCase')
$content = [regex]::Replace($content, '<p>\s*<strong>INTRODU&Ccedil;&Atilde;O</strong>\s*(?:<br\s*/?>)?', '<h2 id="introducao">INTRODU&Ccedil;&Atilde;O</h2><p>', 'IgnoreCase')

$slugMap = @{
  'I' = 'i-escrituras-sagradas'; 'II' = 'ii-deus'; 'III' = 'iii-o-homem'; 'IV' = 'iv-o-pecado';
  'V' = 'v-salvacao'; 'VI' = 'vi-eleicao'; 'VII' = 'vii-reino-de-deus'; 'VIII' = 'viii-igreja';
  'IX' = 'ix-o-batismo-e-a-ceia-do-senhor'; 'X' = 'x-o-dia-do-senhor'; 'XI' = 'xi-ministerio-da-palavra';
  'XII' = 'xii-mordomia'; 'XIII' = 'xiii-evangelizacao-e-missoes'; 'XIV' = 'xiv-educacao-religiosa';
  'XV' = 'xv-liberdade-religiosa'; 'XVI' = 'xvi-ordem-social'; 'XVII' = 'xvii-familia-e-casamento';
  'XVIII' = 'xviii-morte'; 'XIX' = 'xix-justos-e-impios'
}

$content = [regex]::Replace($content, '<p>\s*<strong>(.*?)</strong>\s*</p>', {
  param($match)
  $encodedTitle = $match.Groups[1].Value.Trim()
  $title = [System.Net.WebUtility]::HtmlDecode(($encodedTitle -replace '<[^>]+>', '')).Trim()
  if ($title -match '^([IVX]+)\s*-?\s+') {
    $roman = $Matches[1]
    if ($slugMap.ContainsKey($roman)) { return '<h2 id="' + $slugMap[$roman] + '">' + $encodedTitle + '</h2>' }
  }
  if ($title -match '^[1-3]\s*-\s*Deus') { return '<h3>' + $encodedTitle + '</h3>' }
  return $match.Value
})

$content = [regex]::Replace($content, '<p>\s*([0-9]+\.\s*)', '<p class="references">$1')
$content = $content.Trim()

$page = Get-Content -LiteralPath $PagePath -Raw -Encoding UTF8
$replacement = "<!-- DOCTRINE:START -->`n$content`n          <!-- DOCTRINE:END -->"
$updated = [regex]::Replace($page, '<!-- DOCTRINE:START -->[\s\S]*?<!-- DOCTRINE:END -->', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $replacement })
[System.IO.File]::WriteAllText((Resolve-Path -LiteralPath $PagePath), $updated, (New-Object System.Text.UTF8Encoding($false)))
Write-Output "Doctrine synchronized from $sourceUrl"
