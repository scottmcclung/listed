import React, { useState } from "react";
import axios from "axios";
import getAuthToken from "../../utils/getAuthToken";
import "./SubscriptionForm.scss";

const SubscriptionForm = ({ subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, author }) => {
    const [email, setEmail] = useState("");

    const emailSubscribe = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/email_subscribe`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                },
                data: {
                    email: email
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    return (
        <div>
            {(subscribedToAuthor && subscriptionForAuthor.verification_sent_at) ? (
                subscriptionSuccess || !subscriptionForAuthor.verified ? (
                    <div className="sublabel success">
                        <span>Success. Please check your email to confirm your subscription.</span>
                    </div>
                ) : (
                    <div className="sublabel p2">You're subscribed to this blog.</div>
                )
            ) : (
                <form onSubmit={e => emailSubscribe(e)}>
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="text-field"
                            placeholder="Your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                        <button type="submit" className="button button--primary">Subscribe</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default props => <SubscriptionForm {...props} />;
