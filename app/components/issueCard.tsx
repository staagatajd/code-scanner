import { Finding } from "@/lib/scanner";

export default function IssueCard({ ruleId, severity, line, message, snippet }: Finding)
{
    return(
        <div>
            <div>
                {message}
            </div>

            <div>
                <span>
                    Line: {line}
                </span>
                <div>
                    {snippet}
                </div>
                
            </div>

            <div>
                <div>
                    Info: {ruleId}
                </div>
                <span>
                    Threat: {severity}
                </span>
            </div>
            
        </div>
    );
}