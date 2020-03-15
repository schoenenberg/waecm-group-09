package main

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/coreos/go-oidc"
)

const (
	clientID  = "waecm"
	issuerUrl = "https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm"
)

var (
	verifier *oidc.IDTokenVerifier
)

func main() {
	provider, err := oidc.NewProvider(context.Background(), issuerUrl)
	if err != nil {
		log.Fatalln(err)
	}
	verifier = provider.Verifier(&oidc.Config{ClientID: clientID})

	http.HandleFunc("/api/login", handleLogin)
	log.Fatalln(http.ListenAndServe(":8081", nil))
}

// handleLogin retrieves the ID-Token from the Request and verifies it by
// sending it to the OpenID Connect Server.
func handleLogin(w http.ResponseWriter, r *http.Request) {
	rawIdToken := r.Header.Get("Authorization")

	// removes the Bearer Prefix, leading and tailing space characters
	trimmedToken := strings.TrimPrefix(rawIdToken, "Bearer")
	trimmedToken = strings.TrimSpace(trimmedToken)

	if trimmedToken == "" {
		http.Error(w, "Missing token.", http.StatusUnauthorized)
		return
	}

	_, err := verifier.Verify(r.Context(), trimmedToken)
	if err != nil {
		http.Error(w, "Invalid token.", http.StatusUnauthorized)
	} else {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("Valid token."))
	}
}
