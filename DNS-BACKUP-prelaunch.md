# DNS-Backup flipflopsfilm.com (IONOS) — vor Go-Live

Erfasst: 2026-07-31, vollständige ungefilterte Liste ("Show all records"), DNSSEC = Idle (inaktiv).
Zweck: Wiederherstellungs-Referenz für den Umzug der Website von IONOS Design Service auf Vercel.

## Website — altes IONOS Design Service (WIRD geändert → Vercel)
| Typ  | Host | Wert                              |
|------|------|-----------------------------------|
| A    | @    | 212.227.172.251                   |
| AAAA | @    | 2001:8d8:105:1:0:1:0:7            |
| A    | www  | 217.160.0.177                     |
| AAAA | www  | 2001:8d8:100f:f000:0:0:0:200      |

## Neue Seite — Vercel (funktioniert bereits, Referenz-Config)
| Typ   | Host | Wert                                  |
|-------|------|---------------------------------------|
| CNAME | neu  | e214e6faf86f30ad.vercel-dns-017.com   |

## E-Mail — Google Workspace + IONOS Backup (NICHT ANFASSEN!)
| Typ   | Host                                    | Wert                                                        | Service       |
|-------|-----------------------------------------|-------------------------------------------------------------|---------------|
| MX    | @                                       | aspmx.l.google.com                                          | G Suite       |
| MX    | @                                       | alt1.aspmx.l.google.com                                     | G Suite       |
| MX    | @                                       | alt12.aspmx.l.google.com                                    | G Suite       |
| MX    | @                                       | aspmx2.googlemail.com                                       | G Suite       |
| MX    | @                                       | aspmx3.googlemail.com                                       | G Suite       |
| TXT   | @                                       | v=spf1 include:_spf.google.com include:_spf-eu.iono… (SPF)  | G Suite       |
| TXT   | @                                       | google-site-verification=ONX5z-Cu-r03o36-B…                | G Suite       |
| TXT   | @                                       | google-site-verification=EVVWiCHuqFFqv9sb…                 | -             |
| MX    | backupmail                              | mx00.ionos.es                                              | Mail          |
| MX    | backupmail                              | mx01.ionos.es                                              | Mail          |
| TXT   | backupmail                              | v=spf1 include:_spf-eu.ionos.com ~all                      | Mail          |
| CNAME | s1-ionos._domainkey.backupmail          | s1.dkim.ionos.com                                          | Mail (DKIM)   |
| CNAME | s2-ionos._domainkey.backupmail          | s2.dkim.ionos.com                                          | Mail (DKIM)   |
| CNAME | s42582890._domainkey.backupmail         | s42582890.dkim.ionos.com                                   | Mail (DKIM)   |
| CNAME | autodiscover.backupmail                 | adsredir.ionos.info                                        | Mail          |

## Sonstiges
| Typ   | Host              | Wert                          | Service        |
|-------|-------------------|-------------------------------|----------------|
| CNAME | _domainconnect    | _domainconnect.ionos.com      | Domain Connect |
| TXT   | _dep_ws_mutex     | "61fb485c427fa987e344169…"    | Design Service |
| TXT   | _dep_ws_mutex.www | "309efa5dc9940707c59db2e…"    | Design Service |

## Go-Live-Plan (Kurz)
1. Nur `@` und `www` (A + AAAA) vom IONOS Design Service auf die Vercel-Config umbiegen
   (analog zum funktionierenden `neu`-CNAME).
2. ALLE E-Mail-Einträge (MX / SPF / DKIM / backupmail) unverändert lassen.
3. `_dep_ws_mutex`-Einträge gehören zum alten Design Service und können nach erfolgreichem
   Umzug entfernt werden (kein Muss).
